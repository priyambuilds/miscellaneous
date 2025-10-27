/**
 * =============================================================================
 * CONFIGURATION CONSTANTS - COMMAND PALETTE SETTINGS
 * =============================================================================
 *
 * Centralized configuration for all command palette behavior and performance.
 * These constants control scoring algorithms, UI responsiveness, storage limits,
 * and development monitoring thresholds.
 *
 * ORGANIZATION:
 * - Scoring & Filtering: Algorithm parameters
 * - Store Settings: Memory management thresholds
 * - UI Constants: User experience timing
 * - Storage: Persistence configuration
 *
 * ADJUSTING THESE VALUES:
 * - MIN_SCORE_THRESHOLD: Lower = more results, may reduce quality
 * - MAX_FILTER_RESULTS: Higher = slower performance, better completion
 * - SUBSCRIBER_*_THRESHOLD: Adjust for memory leak detection sensitivity
 * - DEBOUNCE_DELAY: Balance between responsiveness vs performance
 *
 * @usage import { COMMAND_PALETTE_CONFIG } from '@/lib/config'
 */

export const COMMAND_PALETTE_CONFIG = {
  // ============================================
  // SCORING & FILTERING ALGORITHMS
  // ============================================
  // Fine-tune fuzzy search matching and result limiting

  /**
   * MINIMUM FUZZY MATCH SCORE TO SHOW COMMAND
   * Range: 0.0 (any match) to 1.0 (exact match only)
   *
   * LOW VALUES: More results, potentially lower quality matches
   * HIGH VALUES: Fewer results, higher precision matches
   *
   * Recommended: 0.1 (good balance of coverage and relevance)
   */
  MIN_SCORE_THRESHOLD: 0.1,

  /**
   * MAXIMUM FILTERED RESULTS TO DISPLAY
   * Limits search results to prevent performance issues
   *
   * HIGH VALUES: Better completion but slower typing
   * LOW VALUES: Faster but may miss relevant results
   */
  MAX_FILTER_RESULTS: 50,

  // ============================================
  // STORE MEMORY MANAGEMENT
  // ============================================
  // Thresholds for monitoring and preventing memory leaks

  /**
   * WARNING LEVEL FOR ACTIVE SUBSCRIBERS
   * Log warnings when this many components are subscribed
   * Indicates potential memory leak or over-subscription
   */
  SUBSCRIBER_WARNING_THRESHOLD: 20,

  /**
   * CRITICAL LEVEL FOR ACTIVE SUBSCRIBERS
   * Strong warnings above this level - likely memory leak
   */
  SUBSCRIBER_ERROR_THRESHOLD: 100,

  // ============================================
  // USER INTERFACE UX CONSTANTS
  // ============================================
  // Timing and behavior for smooth user experience

  /**
   * INPUT DEBOUNCE DELAY (milliseconds)
   * Delay between user typing and search execution
   *
   * LOW VALUES: More responsive, higher CPU usage
   * HIGH VALUES: Smoother performance, feels laggy
   *
   * Recommended: 150ms (human-perceptible but not annoying)
   */
  DEBOUNCE_DELAY: 150,

  /**
   * SCROLL BEHAVIOR FOR NAVIGATION
   * CSS scroll behavior for command list navigation
   */
  SCROLL_BEHAVIOR: 'smooth' as const,

  // ============================================
  // DATA PERSISTENCE & STORAGE
  // ============================================
  // Configuration for Chrome extension storage

  /**
   * STORAGE KEY FOR RECENT COMMANDS
   * Key used in chrome.storage.local for persistence
   * Unique to avoid conflicts with other extensions
   */
  RECENT_COMMANDS_KEY: 'commandPalette_recent',

  /**
   * MAXIMUM RECENT COMMANDS TO STORE
   * Limits size of recent commands array
   * Balances UX (more recents) vs storage limits
   */
  MAX_RECENT_COMMANDS: 10,
} as const

// TYPE SAFETY: Const assertion ensures literal types for better IntelliSense
// Immutable at runtime - these values should not change during execution
