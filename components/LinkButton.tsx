import { View, Text, Button } from "react-native";
import React from "react";
import { Link } from "expo-router";

interface LinkButtonProps {
  title: string;
  href: string;
}

export default function LinkButton({ title, href }: LinkButtonProps) {
  return (
    <Link href={href} asChild>
      <Button title={title} />
    </Link>
  );
}
