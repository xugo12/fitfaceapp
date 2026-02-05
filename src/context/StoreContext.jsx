import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { SeedData } from '../utils/seedData';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [data, setData] = useState({
        users: [],
        modules: [],
        lessons: [],
        posts: []
    });
    const [loading, setLoading] = useState(true);

    // Initial Data Load
    useEffect(() => {
        // Auth Listener
        supabase.auth.getSession().then(({ data: { session } }) => {
            handleSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            handleSession(session);
        });

        fetchContent();

        return () => subscription.unsubscribe();
    }, []);

    const handleSession = async (session) => {
        if (!session?.user) {
            setUser(null);
            setLoading(false);
            return;
        }

        // Try to fetch profile
        const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();

        if (profile) {
            setUser({ ...session.user, ...profile });
        } else {
            // Profile doesn't exist? Create default one
            const newProfile = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.user_metadata?.full_name || 'Aluno Novo',
                role: 'member',
                photo_url: '',
                streak: 0,
                subscription_status: 'active'
            };
            await supabase.from('profiles').insert(newProfile);
            setUser({ ...session.user, ...newProfile });
        }
        setLoading(false);
    };

    const fetchContent = async () => {
        const { data: modules } = await supabase.from('modules').select('*').order('order', { ascending: true });
        const { data: lessons } = await supabase.from('lessons').select('*');
        const { data: posts } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
        const { data: users } = await supabase.from('profiles').select('*');

        setData(prev => ({
            ...prev,
            modules: modules || [],
            lessons: lessons || [],
            posts: posts || [],
            users: users || []
        }));
    };

    const seedDatabase = async () => {
        // Only seed if empty to avoid duplicates
        if (data.modules && data.modules.length > 0) return;

        // Insert Modules and Lessons
        for (const mod of SeedData.modules) {
            const { lessons, ...modData } = mod;
            const { data: newMod } = await supabase.from('modules').insert(modData).select().single();

            if (newMod && lessons.length > 0) {
                const lessonsWithId = lessons.map(l => ({ ...l, module_id: newMod.id }));
                await supabase.from('lessons').insert(lessonsWithId);
            }
        }

        // Refresh
        fetchContent();
        alert("Banco de dados preenchido com sucesso!");
    };

    const login = async (email, password) => {
        const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { success: false, message: error.message };

        // Manually set user state immediately to avoid race condition/redirect
        if (authData.user) {
            setUser(authData.user);
            await handleSession({ user: authData.user });
        }

        return { success: true };
    };

    const inviteUser = async (email, name) => {
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                data: { full_name: name }
            }
        });
        if (error) return { success: false, message: error.message };
        return { success: true };
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    // Helper to refresh data (called after admin mutations)
    const refreshData = () => {
        fetchContent();
    };

    return (
        <StoreContext.Provider value={{
            user,
            data,
            login,
            logout,
            setData,
            refreshData,
            seedDatabase,
            inviteUser,
            loading
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
