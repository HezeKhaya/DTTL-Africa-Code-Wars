"use client";

import { signInWithGitHub } from "@/lib/auth-actions";
import { Button } from "@chakra-ui/react";

const SignInWithGitHubButton = () => {
    return (
        <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
                signInWithGitHub();
            }}
        >
            Login with GitHub
        </Button>
    );
};

export default SignInWithGitHubButton;
