export type SearchPayload = {
  screen_from: string;
  screen_to: string;
  device_id: string;
  search_method: 'Keyword' | 'Historical';
};

export type SearchResultPageSuccess = {
  screen_from: string;
  screen_to: string;
  device_id: string;
  keyword: string;
  is_keyword_found: boolean;
};

export type SearchClickPayload = {
  screen_from: string;
  screen_to: string;
  device_id: string;
};
