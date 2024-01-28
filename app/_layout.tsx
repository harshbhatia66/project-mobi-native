import React, { useEffect, useState } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig"; // Ensure this path is correct

const InitialLayout = () => {
  const [user, setUser] = useState(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      console.log("User changed: ", currentUser);
      setUser(currentUser);

      const inTabsGroup = segments[0] === "(auth)";
      const currentRoute = segments[0];
      console.log("currentRoute: ", currentRoute);

      if (currentUser && !inTabsGroup) {
        // User is signed in and not in auth group
        router.replace("/home");
      } else if (!currentUser && currentRoute !== "(public)") {
        // User is not signed in
        router.replace("/login");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [segments, router]);

  return <Slot />;
};

export default InitialLayout;
