async function fetchDownload(apiUrl, inputId, resultId) {
    const url = document.getElementById(inputId).value.trim();
    if (!url) {
        alert("Masukkan URL terlebih dahulu!");
        return;
    }

    try {
        console.log(`Fetching: ${apiUrl}${encodeURIComponent(url)}`);
        const response = await fetch(`${apiUrl}${encodeURIComponent(url)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", JSON.stringify(data, null, 2));

        let resultHTML = "";

        // Jika respons berupa array (Facebook)
        if (data.status === true && Array.isArray(data.data)) {
            resultHTML += `<br><img src="${data.data[0].thumbnail}" width="200"><br><b> Pilih Kualitas Video: </b><br>`;
            data.data.forEach(video => {
                resultHTML += `<a href="${video.url}" target="_blank" download>[${video.resolution}] Download</a><br>`;
            });
        }
        // Jika respons berupa objek (YouTube, IG, TikTok, dll.)
        else if (data.status === "tunnel" && data.url) {
            resultHTML = `<br>
                <img src="${data.thumbnail}" width="200"><br>
                <b>${data.title || "Download File"}</b><br>
                <a href="${data.url}" target="_blank" download>Download</a>
            `;
        } 
        else {
            resultHTML = `Gagal mengambil data. Cek respons API: ${JSON.stringify(data)}`;
        }

        document.getElementById(resultId).innerHTML = resultHTML;

    } catch (error) {
        console.error("Fetch Error:", error);
        document.getElementById(resultId).innerHTML = `Terjadi kesalahan: ${error.message}`;
    }
}

function downloadFB() { 
    fetchDownload("https://api.ryzendesu.vip/api/downloader/fbdl?url=", "fbUrl", "fbResult"); 
}

function downloadIG() { 
    fetchDownload("https://api.ryzendesu.vip/api/downloader/igdl?url=", "igUrl", "igResult"); 
}

function downloadTT() { 
    fetchDownload("https://api.ryzendesu.vip/api/downloader/v2/ttdl?url=", "ttUrl", "ttResult"); 
}

function downloadYT() { 
    fetchDownload("https://api.ryzendesu.vip/api/downloader/ytmp4?url=", "ytUrl", "ytResult"); 
}

function downloadYM() { 
    fetchDownload("https://api.ryzendesu.vip/api/downloader/ytmp3?url=", "ymUrl", "ymResult"); 
}