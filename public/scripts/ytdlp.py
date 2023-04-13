import sys
import yt_dlp

requestedAudio = ' '.join(sys.argv[1:])

ydl_opts = {
    'format': 'bestaudio/best',
    'quiet': True,
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192',
    }],
}

res = {
    'title': None,
    'url': None,
}

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info("ytsearch:%s" % requestedAudio, download=False)['entries'][0]

res['url'] = info['formats'][3]['url']
res['title'] = info['title']

print(res)
