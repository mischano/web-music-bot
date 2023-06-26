import sys
import yt_dlp

requestedAudio = ' '.join(sys.argv[1:])

ydl_opts = {
    'format': 'bestaudio/best',
    'quiet': True,
    'noplaylist': True,
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192',
    }],
    # 'restrict-filenames': True,
    # 'restritfilenames': True,
}

# res = {
#     'AUDIO_TITLE': None,
#     'AUDIO_URL': None,
# }
res = ""
with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    try:
        info = ydl.extract_info("ytsearch:%s" % requestedAudio, download=False)['entries'][0]
    except yt_dlp.utils.DownloadError or yt_dlp.utils.ExtractorError:
        print("BIG FAIL")
res = res + "AUDIO_TITLE: " + info['title']
res = res + " "
res = res + "AUDIO_URL: " + info['formats'][3]['url']
# res['AUDIO_URL'] = info['formats'][3]['url']
# res['AUDIO_TITLE'] = info['title']

print(res)

