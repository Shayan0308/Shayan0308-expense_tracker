const supabase = require('../utils/supabase');

exports.auth = async (req, res, next) => {
    // Get the current user session
    const session = supabase.auth.session();

    // Handle authentication state changes
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            console.log('User signed in:', session.user);
        } else if (event === 'SIGNED_OUT') {
            console.log('User signed out');
        }
    });
		console.log("SESSION ============> ",session);
    // Example usage
    if (session) {
        console.log('User is logged in:', session.user);
    } else {
        console.log('User is not logged in');
    }
		// const isEmailExisted = await users.findOne({ where: { email: payload.email, isDelete: false } });
		// req.user = user;
}


