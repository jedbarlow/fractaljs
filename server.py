import web

urls = ('/(.*)', 'static')
app = web.application(urls, globals())

class static:
    def GET(self, name):
        if not name:
            name = 'index.html'
        if name == "favicon.ico":
            return "";
        return open(name).read()

if __name__ == "__main__":
    app.run()
