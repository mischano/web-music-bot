import sys
import json
import yt_dlp


# def format_selector(ctx):
#     """ Select the best video and the best audio that won't result in an mkv.
#     NOTE: This is just an example and does not handle all cases """

#     # formats are already sorted worst to best
#     formats = ctx.get('formats')[::-1]

#     # acodec='none' means there is no audio
#     best_video = next(f for f in formats
#                       if f['vcodec'] != 'none' and f['acodec'] == 'none')

#     # find compatible audio extension
#     # audio_ext = {'mp4': 'm4a', 'webm': 'webm'}[best_video['ext']]
#     audio_ext = {'mp4': 'm4a', 'webm': 'webm'}[best_video['ext']]
#     # vcodec='none' means there is no video
#     best_audio = next(f for f in formats if (
#         f['acodec'] != 'none' and f['vcodec'] == 'none' and f['ext'] == audio_ext))

#     # These are the minimum required fields for a merged format
#     yield {
#         'format_id': f'{best_video["format_id"]}+{best_audio["format_id"]}',
#         'ext': best_video['ext'],
#         'requested_formats': [best_video, best_audio],
#         # Must be + separated list of protocols
#         'protocol': f'{best_video["protocol"]}+{best_audio["protocol"]}'
#     }


requestedAudio = ' '.join(sys.argv[1:])

ydl_opts = {
    'format': '(bestaudio/best)[protocol~="^https?$"]',
    'extractor_args': {'youtube': {'player_client': ['android', 'web']}},
    'quiet': True,
    'noplaylist': True,
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192',
    }],
}

obj = {
    'success': False,
    'title': None,
    "url": None,
}

suc = True
with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    try:
        info = ydl.extract_info("ytsearch:%s" %
                                requestedAudio, download=False)['entries'][0]
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
