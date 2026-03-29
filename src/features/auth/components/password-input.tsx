'use client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function PasswordInput({ name, className, ...props }: PasswordInputProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input
        id={name}
        name={name}
        type={isVisible ? 'text' : 'password'}
        aria-invalid={false}
        className={className}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={toggleVisibility}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
      >
        {isVisible ? (
          <EyeOff className="size-4 text-muted-foreground" />
        ) : (
          <Eye className="size-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}
