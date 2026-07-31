import conf from "../config/conf";
import { createClient } from "@supabase/supabase-js";

export class AuthService {
    supabase;

    constructor() {
        this.supabase = createClient(
            conf.supabaseUrl,
            conf.supabaseAnonKey
        );
    }

    async createAccount({ email, password, name }) {
        try {
            const { data, error } = await this.supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                    },
                },
            });

            if (error) throw error;

            // Automatically login after signup
            if (data.user) {
                return await this.login({ email, password });
            }

            return data;
        } catch (error) {
            console.log("Supabase service :: createAccount :: error", error);
            return null;
        }
    }

    async login({ email, password }) {
        try {
            const { data, error } =
                await this.supabase.auth.signInWithPassword({
                    email,
                    password,
                });

            if (error) throw error;

            return data;
        } catch (error) {
            console.log("Supabase service :: login :: error", error);
            return null;
        }
    }

    async getCurrentUser() {
        try {
            const { data, error } = await this.supabase.auth.getUser();

            if (error) throw error;

            return data.user;
        } catch (error) {
            console.log("Supabase service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            const { error } = await this.supabase.auth.signOut();

            if (error) throw error;

            return true;
        } catch (error) {
            console.log("Supabase service :: logout :: error", error);
            return null;
        }
    }
}

const authService = new AuthService();

export default authService;