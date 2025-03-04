import { getMembers } from "@/actions/member"
import { useQuery } from "@tanstack/react-query"



export const useMembers = () => {
    return useQuery({
        queryKey:["members"],
        queryFn:()=>{
            return getMembers()
        },
        retry:1,
        staleTime: 1000 * 60 * 5
    })
}