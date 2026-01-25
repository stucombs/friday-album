interface EmailTemplateProps {
  unsub_token: string;
}

export function EmailTemplate({ unsub_token }: EmailTemplateProps) {
  return (
    <div className="flex flex-col justify-center">
      <h1 style={{ marginBottom: '10px' }}>Fresh Friday. Fresh album. 🎧</h1>
      <p style={{ marginBottom: '28px', fontSize: '16px' }}>
        This week's listen is live now. <br />
        Head over and dive in.
      </p>
      <a
        href="https://fridayalbum.com"
        style={{
          padding: '12px',
          fontSize: '18px',
          fontWeight: '600',
          color: '#ffffff',
          background: '#6366f1',
          borderRadius: '100px',
          textDecoration: 'none',
          width: '225px',
          textAlign: 'center'
        }}
      >
        ▶︎ Listen now
      </a>
      <p style={{ marginTop: '28px', fontSize: '16px' }}>
        Happy Friday from Friday Album!
      </p>
      <div style={{ fontSize: '12px', marginTop: '45px' }}>
        You are recieving this because you subscribed to weekly album drops.{' '}
        <a
          href={`https://fridayalbum.com/api/unsubscribe?token=${unsub_token}`}
        >
          Unsubscribe
        </a>{' '}
        at any time.
      </div>
    </div>
  );
}
