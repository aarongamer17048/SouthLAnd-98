# Windows 95 OS Website - Configuration Guide

## Overview

The Windows 95 OS website uses a `config.json` file to manage all app content. You can customize everything each app displays without touching any code!

## Quick Start

1. Open `/public/config.json` in any text editor
2. Find the app you want to customize under the `apps` section
3. Edit the content fields
4. Save the file
5. Refresh your browser to see changes

## Config Structure

The `config.json` file is organized like this:

```json
{
  "apps": {
    "app-id": {
      "title": "Display Name",
      "icon": "emoji",
      "content": {
        "field1": "value",
        "field2": ["array", "of", "values"]
      }
    }
  }
}
```

## Customizing Each App

### My Computer (Home / Story)
```json
"my-computer": {
  "title": "My Computer",
  "icon": "💻",
  "content": {
    "heading": "My Computer",
    "description": "🖥️ <strong>1998 Los Santos Server</strong>",
    "intro": "Welcome text here...",
    "features": ["Feature 1", "Feature 2", "Feature 3"]
  }
}
```

**Editable fields:**
- `heading` - Window title
- `description` - Main heading (supports HTML tags like `<strong>`, `<em>`)
- `intro` - Introduction paragraph
- `features` - Array of feature bullet points

---

### Store
```json
"store": {
  "title": "Store",
  "icon": "🛍️",
  "content": {
    "heading": "Store - Tebex",
    "description": "🛍️ Purchase in-game items...",
    "items": ["Item 1", "Item 2", "Item 3"],
    "link": "→ Visit Tebex Store"
  }
}
```

**Editable fields:**
- `heading` - Window title
- `description` - Intro text
- `items` - Array of purchasable items
- `link` - Link text at bottom

---

### Discord
```json
"discord": {
  "title": "Discord",
  "icon": "💬",
  "content": {
    "heading": "Discord Community",
    "description": "💬 Join our community...",
    "features": ["Feature 1", "Feature 2"],
    "link": "→ Join Discord Server"
  }
}
```

**Editable fields:**
- `heading` - Window title
- `description` - Intro text
- `features` - Array of community features
- `link` - Link text at bottom

---

### Gallery
```json
"gallery": {
  "title": "Gallery",
  "icon": "🖼️",
  "content": {
    "heading": "Gallery - MS Paint",
    "description": "🖼️ Server Screenshots & Media",
    "placeholder": "Screenshots coming soon..."
  }
}
```

**Editable fields:**
- `heading` - Window title
- `description` - Intro text
- `placeholder` - Message shown below screenshot grid

---

### Rules
```json
"rules": {
  "title": "Rules",
  "icon": "📋",
  "content": {
    "heading": "Rules & Guidelines",
    "rules": [
      {
        "number": 1,
        "title": "Rule Name",
        "description": "Rule description here"
      }
    ]
  }
}
```

**Editable fields:**
- `heading` - Window title
- `rules` - Array of rule objects with:
  - `number` - Rule number
  - `title` - Rule name
  - `description` - Rule description

---

### Changelog
```json
"changelog": {
  "title": "Changelog",
  "icon": "📝",
  "content": {
    "heading": "CHANGELOG.TXT",
    "entries": [
      {
        "version": "1.5.2",
        "date": "2026-02-28",
        "changes": ["Change 1", "Change 2"]
      }
    ]
  }
}
```

**Editable fields:**
- `heading` - Window title
- `entries` - Array of version entries with:
  - `version` - Version number
  - `date` - Release date
  - `changes` - Array of change descriptions

---

### Internet Explorer
```json
"internet-explorer": {
  "title": "Internet Explorer",
  "icon": "🌐",
  "content": {
    "heading": "Internet Explorer 4.0",
    "description": "🌐 Quick Links",
    "links": ["Link 1", "Link 2", "Link 3"]
  }
}
```

**Editable fields:**
- `heading` - Window title
- `description` - Intro text
- `links` - Array of link names

---

### Control Panel
```json
"control-panel": {
  "title": "Control Panel",
  "icon": "⚙️",
  "content": {
    "heading": "Control Panel",
    "description": "⚙️ Server Information",
    "info": {
      "status": "Online ✓",
      "players": "42/128",
      "version": "1.5.2",
      "lastRestart": "2 days ago",
      "uptime": "99.8%"
    },
    "support": "For support, contact staff on Discord."
  }
}
```

**Editable fields:**
- `heading` - Window title
- `description` - Intro text
- `info` - Object with:
  - `status` - Server status
  - `players` - Current/max players
  - `version` - Server version
  - `lastRestart` - When server was last restarted
  - `uptime` - Server uptime percentage
- `support` - Support message

---

### Network Neighborhood
```json
"network": {
  "title": "Network Neighborhood",
  "icon": "🌍",
  "content": {
    "heading": "Network Neighborhood",
    "description": "🌍 Connected Players",
    "players": ["Player 1 - Location", "Player 2 - Location"],
    "note": "Showing first 4 players..."
  }
}
```

**Editable fields:**
- `heading` - Window title
- `description` - Intro text
- `players` - Array of player names and locations
- `note` - Note text at bottom

---

### WinAmp
```json
"winamp": {
  "title": "WinAmp",
  "icon": "🎵",
  "content": {
    "heading": "WinAmp 2.0",
    "description": "🎵 90s Radio Playlist",
    "stations": ["Station 1 - Genre", "Station 2 - Genre"],
    "nowPlaying": "Station Name"
  }
}
```

**Editable fields:**
- `heading` - Window title
- `description` - Intro text
- `stations` - Array of radio stations
- `nowPlaying` - Currently playing station

---

### Error Popup
```json
"error-popup": {
  "title": "Error",
  "icon": "⚠️",
  "content": {
    "heading": "⚠️ Error",
    "button": "Click for Error Message",
    "errorTitle": "⚠️ Fatal Error",
    "errorMessage": "Error message text...",
    "errorDetails": "Additional details..."
  }
}
```

**Editable fields:**
- `heading` - Window title
- `button` - Button text
- `errorTitle` - Error popup title
- `errorMessage` - Main error message
- `errorDetails` - Additional error details

---

### Recycle Bin
```json
"recycle-bin": {
  "title": "Recycle Bin",
  "icon": "🗑️",
  "content": {
    "heading": "Recycle Bin",
    "description": "🗑️ The Recycle Bin is empty",
    "note": "Deleted files appear here"
  }
}
```

**Editable fields:**
- `heading` - Window title
- `description` - Main text
- `note` - Additional note

---

## Tips

### Using HTML in Text Fields
Some fields support HTML formatting:
- `<strong>text</strong>` - Bold text
- `<em>text</em>` - Italic text
- `<u>text</u>` - Underlined text

Example:
```json
"description": "🖥️ <strong>1998 Los Santos Server</strong>"
```

### Emojis
You can use any emoji in the config:
- 💻 Computer
- 🌐 Internet
- 🛍️ Store
- 💬 Chat
- 📋 Document
- 🎵 Music
- ⚠️ Warning
- ✓ Check mark

### Arrays
For fields that are arrays (like `features`, `items`, `rules`), add or remove items like this:

```json
"features": [
  "First feature",
  "Second feature",
  "Third feature"
]
```

To add a new item, add a comma and the new item:
```json
"features": [
  "First feature",
  "Second feature",
  "Third feature",
  "Fourth feature"
]
```

### Dates
For dates in changelog, use the format: `YYYY-MM-DD`

Example: `"2026-02-28"`

---

## Common Customizations

### Change Server Name
Find `my-computer` and update:
```json
"description": "🖥️ <strong>YOUR SERVER NAME HERE</strong>"
```

### Update Player Count
Find `control-panel` and update:
```json
"players": "50/128"
```

### Add New Rules
Find `rules` and add a new rule object:
```json
"rules": [
  { "number": 1, "title": "Rule 1", "description": "..." },
  { "number": 2, "title": "Rule 2", "description": "..." },
  { "number": 3, "title": "NEW RULE", "description": "Description here" }
]
```

### Update Changelog
Find `changelog` and add a new version entry:
```json
"entries": [
  {
    "version": "1.6.0",
    "date": "2026-03-01",
    "changes": ["New feature 1", "New feature 2"]
  }
]
```

---

## Validation

After editing `config.json`, make sure:
1. All commas are in the right places
2. All quotes are matched (opening and closing)
3. No trailing commas at the end of arrays or objects
4. All special characters are properly escaped

You can validate your JSON at: https://jsonlint.com/

---

## Need Help?

If something breaks:
1. Check the browser console for errors (F12)
2. Validate your JSON at jsonlint.com
3. Make sure all quotes and commas are correct
4. Refresh the page after saving changes

Enjoy customizing your Windows 95 OS website!
