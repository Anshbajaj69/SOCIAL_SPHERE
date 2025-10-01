export const signup = async (req, res) => {
    // signup logic
    res.json({ 
        message: "User signed up" 
    });
};

export const login = async (req, res) => {
    // login logic
    res.json({ 
        message: "User logged in" 
    });
};

export const logout = async (req, res) => {
    // logout logic
    res.json({ 
        message: "User logged out" 
    });
};
