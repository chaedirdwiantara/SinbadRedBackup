package update;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.play.core.appupdate.AppUpdateInfo;
import com.google.android.play.core.appupdate.AppUpdateManager;
import com.google.android.play.core.appupdate.AppUpdateManagerFactory;
import com.google.android.play.core.install.model.UpdateAvailability;
import com.google.android.play.core.tasks.Task;

public class UpdateModule extends ReactContextBaseJavaModule {
    private AppUpdateManager appUpdateManager;

    public UpdateModule(ReactApplicationContext reactContext) {
        super(reactContext);
        appUpdateManager = AppUpdateManagerFactory.create(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "Update";
    }


    @ReactMethod
    public void checkAppUpdate(Callback callback) {
        Task<AppUpdateInfo> appUpdateInfoTask = appUpdateManager.getAppUpdateInfo();

        appUpdateInfoTask.addOnSuccessListener(appUpdateInfo -> {
            if (appUpdateInfo.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE) {
                callback.invoke(true);
            } else {
                callback.invoke(false);
            }
        }).addOnFailureListener(failure -> {
            callback.invoke(failure.toString());
        });
    }
}
