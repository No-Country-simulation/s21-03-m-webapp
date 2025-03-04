import { getMemberById } from "@/actions/member"
import { useQuery, useQueryClient } from "@tanstack/react-query"



export const useMember = (memberId:string) => {


    return useQuery({
        queryKey:["member",memberId],
        queryFn:()=>{ 
            return getMemberById(memberId)
           
        },
        retry:false,
        enabled:!!memberId,
        staleTime: 1000 * 60 * 5
    })
}