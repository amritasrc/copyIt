import conf from "../config/conf";
import supabase from "../lib/supabase";

export class SnippetService {
    async createSnippet({ title, code, description, language }) {
        try {
            const { data, error } = await supabase
                .from(conf.supabaseTable)
                .insert([
                    {
                        title,
                        code,
                        description,
                        language,
                    },
                ])
                .select()
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.log("Supabase service :: createSnippet ::", error);
            return null;
        }
    }

    async updateSnippet(id, { title, code, description, language }) {
        try {
            const { data, error } = await supabase
                .from(conf.supabaseTable)
                .update({
                    title,
                    code,
                    description,
                    language,
                })
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.log("Supabase service :: updateSnippet ::", error);
            return null;
        }
    }

    async deleteSnippet(id) {
        try {
            const { error } = await supabase
                .from(conf.supabaseTable)
                .delete()
                .eq("id", id);

            if (error) throw error;

            return true;
        } catch (error) {
            console.log("Supabase service :: deleteSnippet ::", error);
            return false;
        }
    }

    async getSnippet(id) {
        try {
            const { data, error } = await supabase
                .from(conf.supabaseTable)
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.log("Supabase service :: getSnippet ::", error);
            return null;
        }
    }

    async getSnippets() {
        try {
            const { data, error } = await supabase
                .from(conf.supabaseTable)
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;

            return data;
        } catch (error) {
            console.log("Supabase service :: getSnippets ::", error);
            return [];
        }
    }
}

const snippetService = new SnippetService();

export default snippetService;