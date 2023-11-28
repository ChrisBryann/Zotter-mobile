declare module 'react-native-config' {
  export interface NativeConfig {
    BACKEND_API_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
