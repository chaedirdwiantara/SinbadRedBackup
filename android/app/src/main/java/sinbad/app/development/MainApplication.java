package sinbad.app.development;

import android.app.Application;
import android.content.Context;
import android.os.Build;

import androidx.multidex.MultiDexApplication;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.reactlibrary.RNInstallReferrerPackage;
import com.moengage.react.MoEInitializer;
import com.moengage.react.MoEReactPackage;
import com.moengage.core.MoEngage;
import com.facebook.react.ReactInstanceManager;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
// FOR REANIMATE
import com.facebook.react.bridge.JSIModulePackage;
import com.swmansion.reanimated.ReanimatedJSIModulePackage;
// FOR SPLASH SCREEN
import org.devio.rn.splashscreen.SplashScreenReactPackage;


public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // packages.add(new SplashScreenReactPackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
        //FOR REANIMATE
        @Override
        protected JSIModulePackage getJSIModulePackage() {
          return new ReanimatedJSIModulePackage();
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    // this for flipper
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    // Moengage Init
      if(!BuildConfig.MOENGAGE_KEY.isEmpty() && BuildConfig.MOENGAGE_KEY != null){
          MoEngage.Builder moEngage = new MoEngage.Builder(this, BuildConfig.MOENGAGE_KEY);
          MoEInitializer.INSTANCE.initialize(getApplicationContext(), moEngage);
      }
  }

  /**
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        Class<?> aClass = Class.forName("sinbad.app.development.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
