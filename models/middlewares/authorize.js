export default async function authorize(allowedRoles){
    return (req,res,next)=>{
        const user = req.user;
        if(!user || !allowedRoles.includes(user.role)){
            res.status(403).json({message:'Access denied'})
        }
        next();
    }
}