import AsyncStorage from "@react-native-async-storage/async-storage";
import Sound from 'react-native-sound';

// Optional configuration
export const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: true,
};

export const set_async_data = async (name, value) => {
    try {
        await AsyncStorage.setItem(name, JSON.stringify(value));
        return true;
    } catch (error) {
        return false;
    }
};

export const get_async_data = async (name) => {
    try {
        const data = await AsyncStorage.getItem(name);
        return data != null ? JSON.parse(data) : null;
    } catch (error) {
        return false;
    }
};

export const incrementValue = async () => {
  try {
    // Retrieve the current value from AsyncStorage
    const value = await AsyncStorage.getItem('key');

    // If value is found and it's a number, increment it
    let newValue = value ? parseInt(value, 10) + 1 : 1;

    // Save the new incremented value back to AsyncStorage
    await AsyncStorage.setItem('key', newValue.toString());

    console.log('Updated value:', newValue); // Log the new value
  } catch (error) {
    console.error('Failed to retrieve or update value:', error);
  }
};

export const playSound = (music) => {
    // Load the sound
    const sound = new Sound(music, Sound.MAIN_BUNDLE, (error) => {
        console.log('MAIN_BUNDLE ', Sound.MAIN_BUNDLE);
        if (error) {
            console.error('Failed to load the sound', error);
            return;
        }

        // Play the sound
        sound.play((success) => {
            if (success) {
                console.log('Sound played successfully');
            } else {
                console.log('Playback failed due to audio decoding errors');
            }

            // Release the sound when playback is finished
            sound.release();
        });
    });
};

export const customFunc = (letterpressed, count) => {
    if (count == 0) {
        return {color: 'red'}
    }
    return {}
}