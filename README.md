# Moved

**This package has moved** and is now available at [@dile/dile-password](https://github.com/Polydile/dile-components). Please update your dependencies. This repository is no longer maintained.

# \<dile-password>

This component extends ```<dile-input>``` to create a input password form field.

Please refer to the [```<dile-input>``` component documentation](https://github.com/Polydile/dile-input) to learn to use ```<dile-password>```.

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i dile-password
```

## Usage
```html
<script type="module">
  import 'dile-password/dile-password.js';
</script>

<dile-password label="clave"></dile-password>
```

## Password Strength Indicator

The component includes an optional password strength indicator feature. When enabled, it displays a visual progress bar and text label showing the password strength in real-time as the user types.

### Enable Strength Indicator
```html
<dile-password 
  label="Enter Password" 
  placeholder="Type your password"
  showStrength>
</dile-password>
```

### Strength Levels
The password strength is calculated based on:
- **Length**: 8+ characters (basic), 12+ characters (better)
- **Character variety**: lowercase, uppercase, numbers, special characters

Strength levels displayed:
- **Weak** (25%) - Red progress bar
- **Fair** (50%) - Orange progress bar
- **Good** (75%) - Blue progress bar
- **Strong** (100%) - Green progress bar

### Properties

In addition to all properties inherited from `<dile-input>`:

- **showStrength** (Boolean): Enable/disable the password strength indicator. Default: `false`

### CSS Custom Properties

In addition to all CSS properties from `<dile-input>`, the strength indicator can be customized:

- `--dile-password-strength-label-font-size`: Font size for the strength label. Default: `0.85em`
- `--dile-password-strength-label-color`: Color for the strength label text. Default: `#666`

## Local Demo with `es-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
