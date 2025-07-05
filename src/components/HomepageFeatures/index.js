import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Multi-Factor Authentication',
    Svg: require('@site/static/img/auth-icon.svg').default,
    description: (
      <>
        Comprehensive authentication system supporting TOTP, SMS, Email OTP, 
        OAuth, and Passkey authentication methods with enterprise-grade security.
      </>
    ),
  },
  {
    title: 'Microservices Architecture',
    Svg: require('@site/static/img/architecture-icon.svg').default,
    description: (
      <>
        Scalable microservices architecture with clear separation of concerns,
        enabling independent deployment and horizontal scaling.
      </>
    ),
  },
  {
    title: 'Trading Platform',
    Svg: require('@site/static/img/trading-icon.svg').default,
    description: (
      <>
        Advanced trading platform with portfolio management, strategy execution,
        and real-time market data integration across multiple exchanges.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
} 