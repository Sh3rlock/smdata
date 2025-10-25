# config/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns
from django.views.i18n import set_language

# Include admin outside i18n patterns
urlpatterns = [
    path('admin/', admin.site.urls),
]

# Include app URLs with i18n support
urlpatterns += i18n_patterns(
    path('set-language/', set_language, name='set_language'),
    path('', include('smdataapp.urls')),
    prefix_default_language=False,
)

# Media files
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
