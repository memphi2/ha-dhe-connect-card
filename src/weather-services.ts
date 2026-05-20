export type WeatherService =
  | "search_weather_location"
  | "add_weather_favorite"
  | "remove_weather_favorite"
  | "toggle_weather_favorite"
  | "select_weather_location";

export const DEFAULT_WEATHER_SERVICE: WeatherService = "search_weather_location";

export const WEATHER_FORM_FIELDS = [
  { key: "name", labelKey: "field.name" },
  { key: "country_id", labelKey: "field.country_id" },
  { key: "result_number", labelKey: "field.result" },
  { key: "location_id", labelKey: "field.location_id" },
] as const;

export type WeatherFormKey = (typeof WEATHER_FORM_FIELDS)[number]["key"];

export const DEFAULT_WEATHER_FORM: Record<WeatherFormKey, string> = {
  name: "",
  country_id: "34",
  result_number: "1",
  location_id: "",
};

export const WEATHER_SERVICE_OPTIONS: WeatherService[] = [
  "search_weather_location",
  "add_weather_favorite",
  "remove_weather_favorite",
  "toggle_weather_favorite",
  "select_weather_location",
];
