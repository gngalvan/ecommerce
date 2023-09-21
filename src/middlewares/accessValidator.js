export function publicAccess(req, res, next) {
if(req.session?.user)return res.redirect('/');
next();

}


export function privateAccess(req, res, next) {
    if(!req.session?.user)return res.redirect('/login');
    next();

}

