from django.contrib import admin
from .models import Job, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_jobs_count')
    search_fields = ('name',)
    ordering = ('name',)
    
    def get_jobs_count(self, obj):
        return obj.job_set.count()
    get_jobs_count.short_description = 'Number of Jobs'

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'company_name', 'category', 'job_type', 'created_at')
    list_filter = ('category', 'job_type', 'created_at')
    search_fields = ('title', 'company_name', 'location', 'category__name', 'description', 'requirements')
    list_per_page = 20
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'company_name', 'category', 'location')
        }),
        ('Job Details', {
            'fields': ('job_type', 'salary')
        }),
        ('Description', {
            'fields': ('description', 'email' , 'url_of_job')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at')
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('category')
