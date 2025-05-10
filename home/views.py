from django.shortcuts import render
from job.models import Job

def home_page(request):
    latest_jobs = Job.objects.order_by('-created_at')[:6]
    context = {
        'latest_jobs': latest_jobs
    }
    return render(request, 'home/home.html', context)

def about_page(request):
    
    return render(request, 'home/about.html')