package sinbad.app.development;

import android.content.Context;

import androidx.multidex.MultiDexApplication;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.moengage.react.MoEInitializer;
import com.moengage.core.MoEngage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
// FOR REANIMATE
import com.facebook.react.bridge.JSIModulePackage;
import com.swmansion.reanimated.ReanimatedJSIModulePackage;
// FOR NEWRELIC
import com.newrelic.agent.android.NewRelic;
import newrelic.NewRelicPackage;
import update.UpdatePackage;


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
           packages.add(new NewRelicPackage());
           packages.add(new UpdatePackage());
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
    // FOR NEWRELIC
    if(!BuildConfig.NEWRELIC_TOKEN.isEmpty() && BuildConfig.NEWRELIC_TOKEN != null){
        NewRelic.withApplicationToken(BuildConfig.NEWRELIC_TOKEN).start(this);
    }
    // FOR MOENGAGE
    if(!BuildConfig.MOENGAGE_KEY.isEmpty() && BuildConfig.MOENGAGE_KEY != null){
        MoEngage.Builder moEngage = new MoEngage.Builder(this, BuildConfig.MOENGAGE_KEY);
        MoEInitializer.INSTANCE.initialize(getApplicationContext(), moEngage);
    }
    // FOR FLIPPER
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
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
