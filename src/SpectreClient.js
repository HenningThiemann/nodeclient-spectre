const request = require('request-promise-native');

module.exports = class SpectreClient {
    constructor(spectreURL) {
        this.spectreURL = spectreURL;
    }

    createTestrun(projectName, suiteName) {
        let spectre_url_post = this.spectreURL + '/runs';

        let formData = {
            project: projectName,
            suite: suiteName
        };

        return request({
            method: 'POST',
            uri: spectre_url_post,
            formData: formData,
            json: true
        });
    }

    submitScreenshot(test_name, browser, size, screenshot, run_id, crop_area = '', source_url = '', fuzz_level = '', highlight_color = '') {
        //format spectre_url to send post request to /tests
        let spectre_url_post = this.spectreURL + '/tests';

        const formData = {
            'test[run_id]': run_id.toString(),
            'test[name]': test_name,
            'test[browser]': browser,
            'test[size]': size.toString(),
            'test[crop_area]': crop_area,
            'test[source_url]': source_url,
            'test[fuzz_level]': fuzz_level,
            'test[highlight_color]': highlight_color,
            'test[screenshot]': {
                options: {
                    filename: 'temp.png',
                    contentType: 'image/png'
                },
                value: new Buffer(screenshot, 'base64')
            }
        };

        return request({
            method: 'POST',
            uri: spectre_url_post,
            formData: formData,
            json: true
        });
    }
};