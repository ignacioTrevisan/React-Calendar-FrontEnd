export const GetEnvVariables = () => {
    import.meta.env;
    return {
        ...import.meta.env
    }
}