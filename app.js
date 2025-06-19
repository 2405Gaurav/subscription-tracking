

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/subscriptions',subRouter)

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});

export default app;
