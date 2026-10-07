import http.server, socketserver

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

with socketserver.TCPServer(("0.0.0.0", 8123), NoCacheHandler) as httpd:
    print("serving on 8123 (no-cache)", flush=True)
    httpd.serve_forever()
