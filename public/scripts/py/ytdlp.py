import sys
import json
import yt_dlp

requestedAudio = ' '.join(sys.argv[1:])

ydl_opts = {
    'format': 'bestaudio/best',
    'quiet': True,
    'noplaylist': True,
    'hls_prefer_native': True,
}

obj = {
    'success': False,
    'title': None,
    "url": None,
}

suc = True
with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    try:
        info = ydl.extract_info("ytsearch:%s" % requestedAudio, download=False)['entries'][0]
        suc = True
    except yt_dlp.utils.DownloadError or yt_dlp.utils.ExtractorError:
        suc = False

if suc is False:
    obj['success'] = False
else:
    obj['success'] = True
    obj['title'] = info['title']
    obj['url'] = info['formats'][3]['url']

res = json.dumps(obj)
print(res)
