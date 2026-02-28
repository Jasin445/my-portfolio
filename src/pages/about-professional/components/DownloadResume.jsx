import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DownloadResume = () => {
  const handleDownload = () => {
  const link = document.createElement('a');
  link.href = '/assets/Jason_Dagana_CV.pdf';
  link.download = 'Jason_Dagana_Resume.pdf';
  link.click();
};

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-[#2a363c] via-[#182330] to-muted/20 to-[#2a363c] border-blue-50/40 border-t-2">
      {/* <div className='absolute -top-7 left-0 bg-gradient-to-b from-[#2a363c] via-[#182330] to-[#2a363c] backdrop-blur-sm to-slate-80/40 w-full h-[9%]'></div> */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Download My Resume
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Take a closer look at my professional experience, technical expertise, and
          achievements — all in one document.
        </p>

        {/* Resume Preview */}
        <div className="relative bg-transparent border border-border rounded-xl p-8 mb-8 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="FileText" size={28} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Jason Dagana — Frontend Developer
            </h3>
            <p className="text-sm text-muted-foreground">
              Updated: October 2025 &middot; PDF &middot; 126 KB
            </p>
          </div>

          {/* Download Button */}
          <div className="mt-8 flex justify-center">
            <Button
              variant="default"
              size="lg"
              iconName="Download"
              iconPosition="left"
              onClick={handleDownload}
              className="px-6"
            >
              Download Resume
            </Button>
          </div>
        </div>

        {/* Optional Call to Action */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-border">
          <p className="text-muted-foreground mb-4">
            Want a version tailored to your company or project? I’d love to connect.
          </p>
          <Button variant="outline" iconName="Mail" iconPosition="left">
            Request Custom Resume
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DownloadResume;
