export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackBlogView = (postSlug: string, postTitle: string) => {
  event({
    action: 'view_blog_post',
    category: 'Blog',
    label: `${postTitle} (${postSlug})`,
  });
};

export const trackBlogRead = (postSlug: string, postTitle: string, readingTime: number) => {
  event({
    action: 'complete_blog_read',
    category: 'Blog',
    label: `${postTitle} (${postSlug})`,
    value: readingTime,
  });
};

export const trackSearch = (searchQuery: string) => {
  event({
    action: 'search',
    category: 'Engagement',
    label: searchQuery,
  });
};

export const trackCategoryClick = (categoryName: string) => {
  event({
    action: 'click_category',
    category: 'Navigation',
    label: categoryName,
  });
};

export const trackTagClick = (tagName: string) => {
  event({
    action: 'click_tag',
    category: 'Navigation',
    label: tagName,
  });
};

export const trackShareClick = (platform: string, postSlug: string) => {
  event({
    action: 'share_post',
    category: 'Social',
    label: `${platform} - ${postSlug}`,
  });
};

export const trackNewsletterSignup = () => {
  event({
    action: 'newsletter_signup',
    category: 'Conversion',
    label: 'Newsletter',
  });
};

export const trackExternalLink = (url: string) => {
  event({
    action: 'click_external_link',
    category: 'Outbound',
    label: url,
  });
};
