import { motion } from 'motion/react'

const VARIANT_CLASSES = {
  primary:
    'bg-accent text-background font-semibold hover:shadow-[0_0_28px_rgba(226,162,58,0.38)]',
  secondary:
    'border border-white/15 bg-white/[0.03] text-foreground font-medium hover:border-accent/50 hover:bg-white/[0.06]',
}

function ActionButton({
  href,
  variant = 'primary',
  children,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </motion.a>
  )
}

export default ActionButton
