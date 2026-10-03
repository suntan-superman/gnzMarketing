import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const resetPasswords = process.argv.includes("--reset-passwords");
const unexpectedArguments = process.argv.slice(2).filter((argument) => argument !== "--reset-passwords");
if (unexpectedArguments.length) throw new Error(`Unknown option: ${unexpectedArguments[0]}`);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const admins = [
  { email: process.env.ADMIN, password: process.env.ADMIN_PW, displayName: "GNZ Administrator" },
  { email: process.env.ADMIN2, password: process.env.ADMIN2_PW, displayName: "GNZ Administrator 2" },
].filter((admin) => admin.email || admin.password);

if (!url || !secretKey) throw new Error("Supabase URL and server secret key are required.");
if (admins.length !== 2 || admins.some((admin) => !admin.email || !admin.password)) {
  throw new Error("ADMIN, ADMIN_PW, ADMIN2, and ADMIN2_PW must all be configured.");
}

const client = createClient(url, secretKey, { auth: { autoRefreshToken: false, persistSession: false } });

async function findUser(email) {
  for (let page = 1; page <= 20; page += 1) {
    const { data, error } = await client.auth.admin.listUsers({ page, perPage: 100 });
    if (error) throw error;
    const match = data.users.find((user) => user.email?.toLowerCase() === email.toLowerCase());
    if (match) return match;
    if (data.users.length < 100) return null;
  }
  return null;
}

for (const admin of admins) {
  let user = await findUser(admin.email);
  if (!user) {
    const result = await client.auth.admin.createUser({ email: admin.email, password: admin.password, email_confirm: true });
    if (result.error || !result.data.user) throw result.error || new Error("Admin user could not be created.");
    user = result.data.user;
  } else if (resetPasswords) {
    const { error } = await client.auth.admin.updateUserById(user.id, { password: admin.password });
    if (error) throw error;
  }
  const { error } = await client.from("admin_users").upsert({ user_id: user.id, display_name: admin.displayName });
  if (error) throw error;
}

console.log(resetPasswords
  ? `Provisioned ${admins.length} GNZ administrator accounts, reset requested passwords, and updated admin access.`
  : `Provisioned ${admins.length} GNZ administrator accounts and updated admin access.`);
