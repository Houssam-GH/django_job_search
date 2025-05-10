from django.shortcuts import render, get_object_or_404
from .models import Job
from django.core.paginator import Paginator

# Create your views here.
def job_list(request):
    job_list = Job.objects.all()

    #filter and search
    job_types = request.GET.getlist('job_type')
    location_types = request.GET.getlist('job_location_type')
    query = request.GET.get('q')
    sort_option = request.GET.get('sort', 'newest')


    if sort_option == 'newest':
        job_list = job_list.order_by('-created_at')
    elif sort_option == 'oldest':
        job_list = job_list.order_by('created_at')

    if job_types:
        job_list = job_list.filter(job_type__in=job_types)

    if location_types:
        job_list = job_list.filter(job_location_type__in=location_types)

    if query:
        job_list = job_list.filter(title__icontains=query)



    paginator = Paginator(job_list, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        'job_list': page_obj.object_list,
        'page_obj': page_obj,
        'selected_job_types': job_types,
        'selected_location_types': location_types,
        'search_query': query,
        'current_sort': sort_option,
    }
    return render(request , 'job/jobs.html' , context)


def job_detail(request, id):
    job_detail = get_object_or_404(Job , id=id)
    context = {
        'job' : job_detail
    }
    return render(request , 'job/job_details.html' , context)