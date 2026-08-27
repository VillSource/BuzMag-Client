import { useAppShell } from "@/app-shell/AppShell";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export function OrganizationPage(){
    const isMobile = useIsMobile()
    const navigate = useNavigate()
    const {selectedPrime} = useAppShell();

    useEffect(()=>{
        if (isMobile && !!selectedPrime) navigate({to: '/organizations/unit'})
            console.log(isMobile);
    },[isMobile]);
    
    return <p>ORG</p>
}