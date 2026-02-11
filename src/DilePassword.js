import { html, css } from 'lit-element';
import { DileInput } from 'dile-input';

export class DilePassword extends DileInput {

  static get properties() {
    return {
      ...super.properties,
      /** Show password strength indicator */
      showStrength: { type: Boolean },
      /** Internal property to track password strength */
      _strength: { type: Number },
      /** Internal property to track password strength label */
      _strengthLabel: { type: String }
    };
  }

  constructor() {
    super();
    this.showStrength = false;
    this._strength = 0;
    this._strengthLabel = '';
  }

  // Constants for password strength labels and classes
  static get _STRENGTH_LABELS() {
    return ['', 'Weak', 'Fair', 'Good', 'Strong'];
  }

  static get _STRENGTH_CLASSES() {
    return ['', 'weak', 'fair', 'good', 'strong'];
  }

  // Normalization factor to map raw scores (0-6) to strength levels (0-4)
  static get _SCORE_NORMALIZATION_FACTOR() {
    return 1.5;
  }

  static get styles() {
    return [
      super.styles,
      css`
        .strength-indicator {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .strength-bar-container {
          flex: 1;
          height: 8px;
          background-color: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }
        .strength-bar {
          height: 100%;
          transition: width 0.3s ease, background-color 0.3s ease;
          border-radius: 4px;
        }
        .strength-bar.weak {
          background-color: #f44336;
        }
        .strength-bar.fair {
          background-color: #ff9800;
        }
        .strength-bar.good {
          background-color: #2196f3;
        }
        .strength-bar.strong {
          background-color: #4caf50;
        }
        .strength-label {
          font-size: var(--dile-password-strength-label-font-size, 0.85em);
          color: var(--dile-password-strength-label-color, #666);
          min-width: 60px;
          text-align: right;
        }
      `
    ];
  }

  /**
   * Calculate password strength based on various criteria
   * 
   * The algorithm evaluates passwords based on:
   * - Length: awards points for passwords >= 8 chars and >= 12 chars
   * - Character variety: awards points for lowercase, uppercase, numbers, and special characters
   * 
   * @param {string} password - The password string to evaluate
   * @returns {Object} Strength evaluation object with properties:
   *   - score {number}: Normalized strength score (0-4)
   *   - label {string}: Human-readable strength label ('Weak', 'Fair', 'Good', 'Strong', or empty)
   *   - class {string}: CSS class name for styling ('weak', 'fair', 'good', 'strong', or empty)
   *   - percentage {number}: Strength as percentage (0-100)
   */
  _calculatePasswordStrength(password) {
    if (!password || password.length === 0) {
      return { score: 0, label: '', class: '', percentage: 0 };
    }

    let score = 0;
    
    // Length criteria (max 2 points)
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    
    // Character variety criteria (max 4 points)
    if (/[a-z]/.test(password)) score++; // lowercase
    if (/[A-Z]/.test(password)) score++; // uppercase
    if (/[0-9]/.test(password)) score++; // numbers
    if (/[^a-zA-Z0-9]/.test(password)) score++; // special characters
    
    // Normalize score from 0-6 range to 0-4 range
    const normalizedScore = Math.min(4, Math.floor(score / DilePassword._SCORE_NORMALIZATION_FACTOR));
    
    return {
      score: normalizedScore,
      label: DilePassword._STRENGTH_LABELS[normalizedScore],
      class: DilePassword._STRENGTH_CLASSES[normalizedScore],
      percentage: (normalizedScore / 4) * 100
    };
  }

  _input(e) {
    super._input(e);
    if (this.showStrength) {
      const strength = this._calculatePasswordStrength(this.value);
      this._strength = strength.score;
      this._strengthLabel = strength.label;
      this._strengthClass = strength.class;
      this._strengthPercentage = strength.percentage;
    }
  }

  render() {
    return html`
    <div>
      ${this.label
        ? html`<label for="textField">${this.label}</label>`
        : ''
      }
      <input
        type="password"
        id="textField"
        name="${this.name}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        @keypress="${this._lookForEnter}"
        @input="${this._input}"
        .value="${this.value}"
        class="${ this.errored ? 'errored' : '' }">
      ${this.showStrength && this._strength > 0 ? html`
        <div class="strength-indicator">
          <div class="strength-bar-container">
            <div class="strength-bar ${this._strengthClass}" style="width: ${this._strengthPercentage}%"></div>
          </div>
          <span class="strength-label">${this._strengthLabel}</span>
        </div>
      ` : ''}
    </div>
    `;
  }

}
