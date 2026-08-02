export function processCommand(command: string): {
  action: string;
  url?: string;
  isBrowserAction: boolean;
} {
  const lowerCmd = command.toLowerCase().trim();

  // General Browsing: "Open [website name]"
  const openMatch = lowerCmd.match(/^open\s+(.+)$/);
  if (
    openMatch &&
    !lowerCmd.includes("youtube") &&
    !lowerCmd.includes("spotify")
  ) {
    let website = openMatch[1].trim().replace(/\s+/g, "");
    if (!website.includes(".")) {
      website += ".com";
    }
    return {
      action: `Opening ${openMatch[1]} for you, ugh.`,
      url: `https://www.${website}`,
      isBrowserAction: true,
    };
  }

  // Media Search: "Play [song/video] on YouTube"
  const ytMatch = lowerCmd.match(/^play\s+(.+?)\s+on\s+youtube$/);
  if (ytMatch) {
    const query = encodeURIComponent(ytMatch[1].trim());
    return {
      action: `Playing ${ytMatch[1]} on YouTube. Don't judge my music taste.`,
      url: `https://www.youtube.com/results?search_query=${query}`,
      isBrowserAction: true,
    };
  }

  // Media Search: "Search [query] on Spotify"
  const spotifyMatch = lowerCmd.match(/^search\s+(.+?)\s+on\s+spotify$/);
  if (spotifyMatch) {
    const query = encodeURIComponent(spotifyMatch[1].trim());
    return {
      action: `Searching ${spotifyMatch[1]} on Spotify. Hope it's a banger.`,
      url: `https://open.spotify.com/search/${query}`,
      isBrowserAction: true,
    };
  }

  // WhatsApp Web: "Send a WhatsApp message to [number] saying [message]"
  const waMatch = lowerCmd.match(
    /^send\s+a\s+whatsapp\s+message\s+to\s+([\d\+\s]+)\s+saying\s+(.+)$/,
  );
  if (waMatch) {
    const number = waMatch[1].replace(/\s+/g, "");
    const message = encodeURIComponent(waMatch[2].trim());
    return {
      action: `Sending your message. Let's hope they reply, Shubham.`,
      url: `https://web.whatsapp.com/send?phone=${number}&text=${message}`,
      isBrowserAction: true,
    };
  }

  return { action: "", isBrowserAction: false };
}
      action: "Opening YouTube... 🎬",
      appAction: "YOUTUBE_OPEN",
      appPackage: "com.google.android.youtube",
      isBrowserAction: false,
      isAppAction: true,
    };
  }

  // ========================================
  // GOOGLE - Full Control
  // ========================================
  if (lowerCmd.includes("google")) {
    // "Google par [query] search karo"
    if (lowerCmd.match(/google\s+par\s+(.+?)\s+search\s+karo/)) {
      const query = lowerCmd.match(/google\s+par\s+(.+?)\s+search\s+karo/)?.[1] || "";
      return {
        action: `🔍 Google par "${query}" search kar raha hoon...`,
        appAction: "GOOGLE_SEARCH",
        appPackage: "com.google.android.googlequicksearchbox",
        intentData: { query },
        isBrowserAction: false,
        isAppAction: true,
        isSearchAction: true,
      };
    }

    // "Google maps kholo" / "Google map"
    if (lowerCmd.includes("google map") || lowerCmd.includes("google maps")) {
      const location = lowerCmd.match(/(?:to|for|of)\s+(.+?)(?:\s+in\s+map|\s+on\s+map|$)/)?.[1] || "";
      if (location) {
        return {
          action: `📍 Google Maps par "${location}" dikha raha hoon...`,
          appAction: "GOOGLE_MAPS_SEARCH",
          appPackage: "com.google.android.apps.maps",
          intentData: { location },
          isBrowserAction: false,
          isAppAction: true,
        };
      }
      return {
        action: "Opening Google Maps... 📍",
        appAction: "GOOGLE_MAPS_OPEN",
        appPackage: "com.google.android.apps.maps",
        isBrowserAction: false,
        isAppAction: true,
      };
    }

    // "Google translate kholo"
    if (lowerCmd.includes("google translate") || lowerCmd.includes("translate")) {
      return {
        action: "Opening Google Translate... 🌐",
        appAction: "GOOGLE_TRANSLATE",
        appPackage: "com.google.android.apps.translate",
        isBrowserAction: false,
        isAppAction: true,
      };
    }

    // "Google drive kholo"
    if (lowerCmd.includes("google drive") || lowerCmd.includes("drive")) {
      return {
        action: "Opening Google Drive... ☁️",
        appAction: "GOOGLE_DRIVE",
        appPackage: "com.google.android.apps.docs",
        isBrowserAction: false,
        isAppAction: true,
      };
    }

    // "Google photos kholo"
    if (lowerCmd.includes("google photo") || lowerCmd.includes("google photos")) {
      return {
        action: "Opening Google Photos... 🖼️",
        appAction: "GOOGLE_PHOTOS",
        appPackage: "com.google.android.apps.photos",
        isBrowserAction: false,
        isAppAction: true,
      };
    }

    return {
      action: "Opening Google... 🔍",
      appAction: "GOOGLE_OPEN",
      appPackage: "com.google.android.googlequicksearchbox",
      isBrowserAction: false,
      isAppAction: true,
    };
  }

  // ========================================
  // WHATSAPP - Full Control
  // ========================================
  if (lowerCmd.includes("whatsapp")) {
    // "WhatsApp par status dekho"
    if (lowerCmd.includes("whatsapp status") || lowerCmd.includes("status dekho")) {
      return {
        action: "👀 WhatsApp Status dekh raha hoon...",
        appAction: "WHATSAPP_STATUS",
        appPackage: "com.whatsapp",
        isBrowserAction: false,
        isAppAction: true,
        isReelAction: true,
      };
    }

    // "WhatsApp par status update karo [text]"
    if (lowerCmd.match(/whatsapp\s+par\s+status\s+(?:update|daalo|karo)\s+(.+)/)) {
      const status = lowerCmd.match(/whatsapp\s+par\s+status\s+(?:update|daalo|karo)\s+(.+)/)?.[1] || "";
      return {
        action: `📝 WhatsApp Status update kar raha hoon: "${status}"`,
        appAction: "WHATSAPP_STATUS_UPDATE",
        appPackage: "com.whatsapp",
        intentData: { status },
        isBrowserAction: false,
        isAppAction: true,
      };
    }

    // "WhatsApp par [name] ko [message] bolo"
    const waMsgMatch = lowerCmd.match(/whatsapp\s+par\s+(\w+)\s+ko\s+(.+?)(?:\s+bolo|\s+likho|\s+bhejo|\s+do|$)/);
    if (waMsgMatch && contactNames.includes(waMsgMatch[1].toLowerCase())) {
      const name = waMsgMatch[1];
      const message = waMsgMatch[2].trim();
      return {
        action: `✅ WhatsApp par ${name} ko message bhej raha hoon: "${message}"`,
        appAction: "WHATSAPP_CONTACT",
        appPackage: "com.whatsapp",
        intentData: { contactName: name, message },
        isBrowserAction: false,
        isAppAction: true,
      };
    }

    // "WhatsApp par [name] ko call karo"
    if (lowerCmd.match(/whatsapp\s+par\s+(\w+)\s+ko\s+call/)) {
      const name = lowerCmd.match(/whatsapp\s+par\s+(\w+)\s+ko\s+call/)?.[1] || "";
      if (contactNames.includes(name.toLowerCase()) || name) {
        return {
          action: `📞 WhatsApp par ${name} ko call kar raha hoon...`,
          appAction: "WHATSAPP_CALL",
          appPackage: "com.whatsapp",
          intentData: { contactName: name },
          isBrowserAction: false,
          isAppAction: true,
        };
      }
    }

    // "WhatsApp par [name] ko video call"
    if (lowerCmd.match(/whatsapp\s+par\s+(\w+)\s+ko\s+video/)) {
      const name = lowerCmd.match(/whatsapp\s+par\s+(\w+)\s+ko\s+video/)?.[1] || "";
      if (contactNames.includes(name.toLowerCase()) || name) {
        return {
          action: `📹 WhatsApp par ${name} ko video call kar raha hoon...`,
          appAction: "WHATSAPP_VIDEO_CALL",
          appPackage: "com.whatsapp",
          intentData: { contactName: name },
          isBrowserAction: false,
          isAppAction: true,
        };
      }
    }

    // "WhatsApp group kholo"
    if (lowerCmd.includes("whatsapp group") || lowerCmd.includes("group")) {
      return {
        action: "👥 WhatsApp Groups dekh raha hoon...",
        appAction: "WHATSAPP_GROUPS",
        appPackage: "com.whatsapp",
        isBrowserAction: false,
        isAppAction: true,
      };
    }

    return {
      action: "Opening WhatsApp... 💬",
      appAction: "WHATSAPP_OPEN",
      appPackage: "com.whatsapp",
      isBrowserAction: false,
      isAppAction: true,
    };
  }

  // ========================================
  // INSTAGRAM - Full Control
  // ========================================
  if (lowerCmd.includes("instagram")) {
    // "Instagram reel scroll karo" / "Reel dekho"
    if (lowerCmd.includes("reel") || lowerCmd.includes("scroll")) {
      return {
        action: "📱 Instagram Reels scroll kar raha hoon... 🔥",
        appAction: "INSTAGRAM_REELS",
        appPackage: "com.instagram.android",
        isBrowserAction: false,
        isAppAction: true,
        isReelAction: true,
      };
    }

    // "Instagram feed scroll karo"
    if (lowerCmd.includes("feed") || lowerCmd.includes("scroll feed") || lowerCmd.includes("home")) {
      return {
        action: "📱 Instagram Feed scroll kar raha hoon...",
        appAction: "INSTAGRAM_FEED",
        appPackage: "com.instagram.android",
        isBrowserAction: false,
        isAppAction: true,
        isReelAction: true,
      };
    }

    // "Instagram search [query]"
    if (lowerCmd.match(/instagram\s+(?:search|find|dhoondho)\s+(.+)/)) {
      const query = lowerCmd.match(/instagram\s+(?:search|find|dhoondho)\s+(.+)/)?.[1] || "";
      return {
        action: `🔍 Instagram par "${query}" search kar raha hoon...`,
        appAction: "INSTAGRAM_SEARCH",
        appPackage: "com.instagram.android",
        intentData: { query },
        isBrowserAction: false,
        isAppAction: true,
        isSearchAction: true,
      };
    }

    // "Instagram par [name] ko reply karo"
    const igReplyMatch = lowerCmd.match(/instagram\s+par\s+(\w+)\s+ko\s+(reply|message|send|text)\s+(.+)/);
    if (igReplyMatch && contactNames.includes(igReplyMatch[1].toLowerCase())) {
      const name = igReplyMatch[1];
      const message = igReplyMatch[3].trim();
      return {
        action: `📩 Instagram par ${name} ko reply bhej raha hoon: "${message}"`,
        appAction: "INSTAGRAM_REPLY",
        appPackage: "com.instagram.android",
        intentData: { contactName: name, message },
        isBrowserAction: false,
        isAppAction: true,
      };
    }

    // "Instagram par [name] follow karo"
    if (lowerCmd.match(/instagram\s+par\s+(\w+)\s+ko\s+follow/)) {
      const name = lowerCmd.match(/instagram\s+par\s+(\w+)\s+ko\s+follow/)?.[1] || "";
      return {
        action: `👤 Instagram par ${name} ko follow kar raha hoon...`,
        appAction: "INSTAGRAM_FOLLOW",
        appPackage: "com.instagram.android",
        intentData: { username: name },
        isBrowserAction: false,
        isAppAction: true,
      };
    }

    // "Instagram par [name] ki story dekho"
    if (lowerCmd.match(/instagram\s+par\s+(\w+)\s+ki\s+story/)) {
      const name = lowerCmd.match(/instagram\s+par\s+(\w+)\s+ki\s+story/)?.[1] || "";
      return {
        action: `📸 Instagram par ${name} ki story dekh raha hoon...`,
        appAction: "INSTAGRAM_STORY",
        appPackage: "com.instagram.android",
        intentData: { username: name },
        isBrowserAction: false,
        isAppAction: true,
      };
    }

    // "Instagram par [name] ki profile dekho"
    if (lowerCmd.match(/instagram\s+par\s+(\w+)\s+ki\s+profile/)) {
      const name = lowerCmd.match(/instagram\s+par\s+(\w+)\s+ki\s+profile/)?.[1] || "";
      return {
        action: `👤 Instagram par ${name} ki profile dekh raha hoon...`,
        appAction: "INSTAGRAM_PROFILE",
        appPackage: "com.instagram.android",
        intentData: { username: name },
        isBrowserAction: false,
        isAppAction: true,
      };
    }

    // "Instagram explore karo"
    if (lowerCmd.includes("explore") || lowerCmd.includes("discover")) {
      return {
        action: "🔍 Instagram Explore page dekh raha hoon...",
        appAction: "INSTAGRAM_EXPLORE",
        appPackage: "com.instagram.android",
        isBrowserAction: false,
        isAppAction: true,
      };
    }

    // "Instagram notifications dekho"
    if (lowerCmd.includes("notification") || lowerCmd.includes("activity")) {
      return {
        action: "🔔 Instagram notifications dekh raha hoon...",
        appAction: "INSTAGRAM_NOTIFICATIONS",
        appPackage: "com.instagram.android",
        isBrowserAction: false,
        isAppAction: true,
      };
    }

    return {
      action: "Opening Instagram... 📸",
      appAction: "INSTAGRAM_OPEN",
      appPackage: "com.instagram.android",
      isBrowserAction: false,
      isAppAction: true,
    };
  }

  // ========================================
  // CHROME / BROWSER
  // ========================================
  if (lowerCmd.includes("chrome") || lowerCmd.includes("browser") || lowerCmd.includes("web")) {
    if (lowerCmd.match(/chrome\s+par\s+(.+?)\s+search/)) {
      const query = lowerCmd.match(/chrome\s+par\s+(.+?)\s+search/)?.[1] || "";
      return {
        action: `🌐 Chrome par "${query}" search kar raha hoon...`,
        appAction: "CHROME_SEARCH",
        appPackage: "com.android.chrome",
        intentData: { query },
        isBrowserAction: false,
        isAppAction: true,
        isSearchAction: true,
      };
    }
    if (lowerCmd.match(/open\s+(.+?)\s+in\s+chrome/)) {
      const site = lowerCmd.match(/open\s+(.+?)\s+in\s+chrome/)?.[1] || "";
      let url = site.replace(/\s+/g, "");
      if (!url.includes(".")) url += ".com";
      return {
        action: `🌐 Chrome par ${url} khol raha hoon...`,
        appAction: "CHROME_OPEN",
        appPackage: "com.android.chrome",
        intentData: { url: `https://www.${url}` },
        isBrowserAction: false,
        isAppAction: true,
      };
    }
    return {
      action: "Opening Chrome... 🌐",
      appAction: "CHROME_OPEN",
      appPackage: "com.android.chrome",
      isBrowserAction: false,
      isAppAction: true,
    };
  }

  // ========================================
  // PHONE / CALL - Full Control
  // ========================================
  if (lowerCmd.includes("call") || lowerCmd.includes("phone") || lowerCmd.includes("dial")) {
    if (lowerCmd.match(/call\s+(\w+)/i)) {
      const name = lowerCmd.match(/call\s+(\w+)/i)?.[1] || "";
      if (contactNames.includes(name.toLowerCase()) || name) {
        return {
          action: `📞 ${name} ko call kar raha hoon...`,
          appAction: "PHONE_CALL_CONTACT",
          appPackage: "com.android.dialer",
          intentData: { contactName: name },
          isBrowserAction: false,
          isAppAction: true,
        };
      }
    }
    if (lowerCmd.match(/call\s+([\d\+\s]+)/)) {
      const number = lowerCmd.match(/call\s+([\d\+\s]+)/)?.[1]?.replace(/\s+/g, "") || "";
      return {
        action: `📞 ${number} ko call kar raha hoon...`,
        appAction: "PHONE_CALL",
        appPackage: "com.android.dialer",
        intentData: { number },
        isBrowserAction: false,
        isAppAction: true,
      };
    }
    if (lowerCmd.includes("video call") && lowerCmd.match(/video\s+call\s+(\w+)/)) {
      const name = lowerCmd.match(/video\s+call\s+(\w+)/)?.[1] || "";
      return {
        action: `📹 ${name} ko video call kar raha hoon...`,
        appAction: "VIDEO_CALL",
        appPackage: "com.android.dialer",
        intentData: { contactName: name },
        isBrowserAction: false,
        isAppAction: true,
      };
    }
    if (lowerCmd.includes("phone dialer") || lowerCmd.includes("phone app")) {
      return {
        action: "📱 Phone Dialer khol raha hoon...",
        appAction: "PHONE_DIALER",
        appPackage: "com.android.dialer",
        isBrowserAction: false,
        isAppAction: true,
      };
    }
    return {
      action: "📞 Phone khol raha hoon...",
      appAction: "PHONE_OPEN",
      appPackage: "com.android.dialer",
      isBrowserAction: false,
      isAppAction: true,
    };
  }

  // ========================================
  // TELEGRAM
  // ========================================
  if (lowerCmd.includes("telegram")) {
    const tgMsgMatch = lowerCmd.match(/telegram\s+par\s+(\w+)\s+ko\s+(.+?)(?:\s+bolo|\s+likho|\s+bhejo|$)/);
    if (tgMsgMatch && contactNames.includes(tgMsgMatch[1].toLowerCase())) {
      const name = tgMsgMatch[1];
      const message = tgMsgMatch[2].trim();
      return {
        action: `✈️ Telegram par ${name} ko message bhej raha hoon: "${message}"`,
        appAction: "TELEGRAM_CONTACT",
        appPackage: "org.telegram.messenger",
        intentData: { contactName: name, message },
        isBrowserAction: false,
        isAppAction: true,
      };
    }
    return {
      action: "Opening Telegram... ✈️",
      appAction: "TELEGRAM_OPEN",
      appPackage: "org.telegram.messenger",
      isBrowserAction: false,
      isAppAction: true,
    };
  }

  // ========================================
  // GENERAL SEARCH (Any app)
  // ========================================
  if (lowerCmd.includes("search")) {
    const searchMatch = lowerCmd.match(/search\s+(.+?)(?:\s+in\s+(\w+)|$)/);
    if (searchMatch) {
      const query = searchMatch[1].trim();
      const app = searchMatch[2] || "google";
      const appMap: any = {
        google: { name: "Google", pkg: "com.google.android.googlequicksearchbox", action: "GOOGLE_SEARCH" },
        youtube: { name: "YouTube", pkg: "com.google.android.youtube", action: "YOUTUBE_SEARCH" },
        instagram: { name: "Instagram", pkg: "com.instagram.android", action: "INSTAGRAM_SEARCH" },
        twitter: { name: "Twitter", pkg: "com.twitter.android", action: "TWITTER_SEARCH" },
        reddit: { name: "Reddit", pkg: "com.reddit.frontpage", action: "REDDIT_SEARCH" },
      };
      const appInfo = appMap[app] || appMap.google;
      return {
        action: `🔍 ${appInfo.name} par "${query}" search kar raha hoon...`,
        appAction: appInfo.action,
        appPackage: appInfo.pkg,
        intentData: { query },
        isBrowserAction: false,
        isAppAction: true,
        isSearchAction: true,
      };
    }
  }

  // ========================================
  // GOOD MORNING / GREETING
  // ========================================
  if (lowerCmd.match(/good\s+morning|gm|morning/) && detectedName) {
    const name = detectedName;
    return {
      action: `🌅 ${name} ko Good Morning bhej raha hoon!`,
      appAction: "SEND_GREETING",
      appPackage: "com.whatsapp",
      intentData: { contactName: name, message: "Good Morning! 🌅 Have a great day!" },
      isBrowserAction: false,
      isAppAction: true,
    };
  }

  // ========================================
  // DEFAULT - Google Search
  // ========================================
  return {
    action: `🔍 "${command}" Google par search kar raha hoon...`,
    url: `https://www.google.com/search?q=${encodeURIComponent(command)}`,
    isBrowserAction: true,
    isAppAction: false,
    isSearchAction: true,
  };
}
