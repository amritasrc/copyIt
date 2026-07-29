import conf from "../config/conf";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    conf.supabaseUrl,
    conf.supabaseAnonKey
);

export default supabase;