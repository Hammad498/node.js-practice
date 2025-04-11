import exprress from 'express';
import publicRoutes from './routes/public.routes.js';
import privateRoutes from './routes/private.routes.js';


const app=exprress();

app.use(exprress.json());

app.use("/public",publicRoutes);
app.use("/private",privateRoutes);





app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})
