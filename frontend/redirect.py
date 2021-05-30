
import google
import sys
gae_dir = google.__path__.append('/path/to/appengine_sdk/google_appengine/google')
sys.path.insert(0, gae_dir) # might not be necessary


from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

class AllHandler(webapp.RequestHandler):
    def get(self):
        self.redirect("https://viergewinnt-frontend-dot-secure-sensor-310809.ey.r.appspot.com", True)

application = webapp.WSGIApplication([('/.*', AllHandler)])

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()