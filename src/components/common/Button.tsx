import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const StyledButton = styled(motion.button)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $loading: boolean;
  $fullWidth: boolean;
}>`
  border: none;
  border-radius: ${props => props.theme.common.borderRadius.medium};
  font-family: ${props => props.theme.common.typography.fontFamily.primary};
  font-weight: ${props => props.theme.common.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
  
  /* Size variants */
  ${props => props.$size === 'sm' && css`
    padding: ${props.theme.common.spacing.xs} ${props.theme.common.spacing.sm};
    font-size: ${props.theme.common.typography.fontSize.sm};
    min-height: 44px; /* Ensure mobile touch target */
  `}
  
  ${props => props.$size === 'md' && css`
    padding: ${props.theme.common.spacing.sm} ${props.theme.common.spacing.md};
    font-size: ${props.theme.common.typography.fontSize.md};
    min-height: 48px; /* Good mobile touch target */
  `}
  
  ${props => props.$size === 'lg' && css`
    padding: ${props.theme.common.spacing.md} ${props.theme.common.spacing.lg};
    font-size: ${props.theme.common.typography.fontSize.lg};
    min-height: 52px; /* Large mobile touch target */
  `}
  
  /* Variant styles */
  ${props => props.$variant === 'primary' && css`
    background: ${props.theme.current.gradients.main};
    color: ${props.theme.current.colors.text};
    box-shadow: ${props.theme.common.shadows.small};
    
    &:hover:not(:disabled) {
      box-shadow: ${props.theme.common.shadows.medium};
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: ${props.theme.common.shadows.small};
    }
  `}
  
  ${props => props.$variant === 'secondary' && css`
    background: ${props.theme.current.colors.surface};
    color: ${props.theme.current.colors.text};
    border: 1px solid ${props.theme.current.colors.primary};
    
    &:hover:not(:disabled) {
      background: ${props.theme.current.colors.primary};
      color: ${props.theme.current.colors.text};
    }
  `}
  
  ${props => props.$variant === 'outline' && css`
    background: transparent;
    color: ${props.theme.current.colors.primary};
    border: 1px solid ${props.theme.current.colors.primary};
    
    &:hover:not(:disabled) {
      background: ${props.theme.current.colors.primary};
      color: ${props.theme.current.colors.text};
    }
  `}
  
  ${props => props.$variant === 'ghost' && css`
    background: transparent;
    color: ${props.theme.current.colors.text};
    
    &:hover:not(:disabled) {
      background: ${props.theme.current.colors.surface};
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  ${props => props.$loading && css`
    color: transparent;
  `}
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  disabled,
  onClick,
  type = 'button',
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      $variant={variant}
      $size={size}
      $loading={loading}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      whileTap={{ scale: 0.98 }}
    >
      {loading && <LoadingSpinner />}
      {children}
    </StyledButton>
  );
};