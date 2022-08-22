export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageview = () => {
  if (process.env.NODE_ENV === 'production') {
    try {
      window.fbq('track', 'PageView');
    } catch (error) {
      // Ignore error
    }
  }
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (eventName: string, options: Record<string, unknown> = {}) => {
  if (process.env.NODE_ENV === 'production') {
    try {
      window.fbq('track', eventName, options);
    } catch (error) {
      // Ignore error
    }
  }
};
