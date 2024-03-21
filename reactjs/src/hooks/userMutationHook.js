import { useMutation } from 'react-query';

export const useUserMutation = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback
    })
    return mutation
}