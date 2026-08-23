import type { UserDto } from "@/api/types/UserDto";
import { useEffect, useState } from "react";

export function useProfile() {
  const [user, setUser] = useState<UserDto | undefined>(undefined);

  useEffect(() => {
    const mockUser: UserDto = {
      email: "mock@test.com",
      emailConfirmed: true,
      firstName: "Mock",
      id: "00000000-0000-0000-0000-000000000000",
      imageUrl: "https://avatars.githubusercontent.com/u/30929839?v=4",
      isActive: true,
      lastName: "Test",
      phoneNumber: "08x-xxx-xxxx",
      twoFactorEnabled:false,
      userName: "pandora.box"
    };
    setUser(mockUser);
    return () => setUser(undefined);
  }, []);

  return user;
}
